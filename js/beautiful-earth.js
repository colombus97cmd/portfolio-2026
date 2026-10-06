/* BEAUTIFUL EARTH CORP — FICHE DE FAISABILITÉ PAR SURFACE DE TERRAIN
   Modèle : autonomie complète 24 h/24 (solaire + batteries + micro-hydro), aucun minage sur le réseau. */

(function () {
    const PV_YIELD_MWH_PER_KWC = 1.55;   // 1 550 kWh/kWc/an
    const MWH_PER_PH = 118.26;           // 13,5 kW x 8 760 h (Antminer S21 XP, 13,5 J/TH)
    const KW_PER_PH = 13.5;
    const PH_PER_MACHINE = 0.27;
    const STORAGE_LOSS = 1.04;           // pertes de stockage
    const NIGHT_HOURS = 12.5;
    const DEPTH_OF_DISCHARGE = 0.8;
    const COST_PV = 1100;                // €/kWc
    const COST_BATTERY = 350;            // €/kWh
    const COST_HYDRO = 6000;             // €/kW
    const COST_MACHINE = 4500;           // € par S21 XP
    const MACHINE_LIFE = 4;              // années
    const MAINTENANCE_PER_PH = 2150;     // €/an
    const ENERGY_OM_RATE = 0.01;         // 1 % de l'investissement énergie par an
    const GRID_PRICE = 0.18;             // €/kWh, tarif professionnel de référence
    // Le palier A (site pilote) tourne en mode modulé jour/nuit : seuls les paliers en continu sont comparés ici.
    const MILESTONES = [
        { name: 'Palier B — trésorerie', ph: 50 },
        { name: 'Palier C — Antspace', ph: 209 },
    ];

    const $ = (id) => document.getElementById(id);
    const num = (v, d = 1) => v.toLocaleString('fr-FR', { maximumFractionDigits: d });
    const eur = (v) => {
        const a = Math.abs(v);
        if (a >= 1e6) return num(v / 1e6, 2) + ' M€';
        if (a >= 1e3) return num(v / 1e3, 0) + ' k€';
        return num(v, 0) + ' €';
    };
    const years = (v) => (isFinite(v) && v > 0 ? num(v, 1) + ' ans' : 'non rentable');

    function surfaceFor(ph, density, hydroKw) {
        const pvMwh = Math.max(0, ph * MWH_PER_PH - hydroKw * 8.76) * STORAGE_LOSS;
        return pvMwh / PV_YIELD_MWH_PER_KWC / 1000 / density;
    }

    function update() {
        const ha = parseFloat($('beSurface').value);
        const density = parseFloat($('beDensity').value);
        const hydroKw = parseFloat($('beHydro').value);
        const hashprice = parseFloat($('beHashprice').value);
        const subsidy = parseFloat($('beSubsidy').value) / 100;

        $('beSurfaceVal').textContent = num(ha) + ' ha';
        $('beHydroVal').textContent = hydroKw + ' kW';
        $('beHashpriceVal').textContent = hashprice + ' €/PH/j';
        $('beSubsidyVal').textContent = Math.round(subsidy * 100) + ' %';

        // Énergie
        const kwc = ha * density * 1000;
        const pvMwh = kwc * PV_YIELD_MWH_PER_KWC;
        const hydroMwh = hydroKw * 8.76;
        const usableMwh = pvMwh / STORAGE_LOSS + hydroMwh;
        const ph = usableMwh / MWH_PER_PH;
        const machines = Math.round(ph / PH_PER_MACHINE);
        const batteryKwh = Math.max(0, ph * KW_PER_PH - hydroKw) * NIGHT_HOURS / DEPTH_OF_DISCHARGE;

        // Investissement et amortissement de l'énergie
        const capexEnergy = kwc * COST_PV + batteryKwh * COST_BATTERY + hydroKw * COST_HYDRO;
        const capexEnergyNet = capexEnergy * (1 - subsidy);
        const energyOm = capexEnergy * ENERGY_OM_RATE;
        const gridValue = ph * MWH_PER_PH * 1000 * GRID_PRICE;
        const paybackEnergy = capexEnergyNet / (gridValue - energyOm);

        // Rentabilité du calcul
        const revenue = ph * hashprice * 365;
        const capexMachines = machines * COST_MACHINE;
        const cash = revenue - ph * MAINTENANCE_PER_PH - energyOm - capexMachines / MACHINE_LIFE;
        const capexTotal = capexEnergyNet + capexMachines;
        const paybackTotal = cash > 0 ? capexTotal / cash : Infinity;

        $('rKwc').textContent = kwc >= 1000 ? num(kwc / 1000, 2) + ' MWc' : num(kwc, 0) + ' kWc';
        $('rProd').textContent = num((pvMwh + hydroMwh) / 1000, 2) + ' GWh/an produits';
        $('rPh').textContent = num(ph) + ' PH/s';
        $('rMachines').textContent = '≈ ' + machines + ' Antminer S21 XP';
        $('rBatt').textContent = batteryKwh >= 1000 ? num(batteryKwh / 1000) + ' MWh' : num(batteryKwh, 0) + ' kWh';
        $('rCapexE').textContent = eur(capexEnergy);
        $('rCapexENet').textContent = eur(capexEnergyNet) + ' après subventions';
        $('rAvoided').textContent = eur(gridValue);
        $('rPaybackE').textContent = years(paybackEnergy);
        $('rRevenue').textContent = eur(revenue);
        $('rCash').textContent = eur(cash);
        $('rPaybackT').textContent = years(paybackTotal);
        $('rCapexT').textContent = 'pour ' + eur(capexTotal) + ' investis (dont ' + eur(capexMachines) + ' de machines)';

        const verdict = $('rVerdict');
        if (paybackTotal <= 12) {
            verdict.className = 'be-verdict ok';
            verdict.textContent = `✓ Avec ${num(ha)} ha, le site tourne en autonomie complète à ${num(ph)} PH/s. Son énergie se rembourse en ${years(paybackEnergy)} par rapport au réseau, et le projet complet en ${years(paybackTotal)}.`;
        } else {
            verdict.className = 'be-verdict warn';
            verdict.textContent = `Avec ${num(ha)} ha, le site tourne en autonomie complète à ${num(ph)} PH/s et son énergie se rembourse en ${years(paybackEnergy)} par rapport au réseau. Mais à ${hashprice} €/PH/j, le projet complet met ${years(paybackTotal)} à se rembourser : il faut davantage de subventions, un hashprice plus élevé ou des batteries moins chères.`;
        }

        $('rMilestones').innerHTML = MILESTONES.map((m) => {
            const need = surfaceFor(m.ph, density, hydroKw);
            const ok = ha >= need;
            return `<tr><td>${m.name} (${num(m.ph)} PH/s)</td><td>${num(need)} ha</td>` +
                `<td class="${ok ? 'reached' : ''}">${ok ? '✓ Atteint' : 'Manque ' + num(need - ha) + ' ha'}</td></tr>`;
        }).join('');
    }

    ['beSurface', 'beHydro', 'beHashprice', 'beSubsidy'].forEach((id) => $(id).addEventListener('input', update));
    $('beDensity').addEventListener('change', update);
    update();
})();
