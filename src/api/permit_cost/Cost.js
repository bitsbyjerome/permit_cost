import Alberta from './Alberta'
import BritishColumbia from './BritishColumbia';
import Manitoba from './Manitoba';
import NewBrunswick from './NewBrunswick';
import NewfoundlandAndLabrador from './NewfoundlandAndLabrador';
import NorthwestTerritories from './NorthwestTerritories';
import NovaScotia from './NovaScotia';
import Nunavut from './Nunavut';
import Ontario from './Ontario';
import PrinceEdwardIsland from './PrinceEdwardIsland';
import Quebec from './Quebec';
import Saskatchewan from './Saskatchewan';
import YukonTerritory from './YukonTerritory';


class Cost {

    getPermitCostByProvince = (province, tripDetails) => {

        switch (province) {
            case 'AB':
                const alberta = new Alberta();
                if(tripDetails.permitType === 'regular'){
                    return alberta.getRegularPermitCost(tripDetails);
                }
                return alberta.getOversizePermitCost(tripDetails);
            case 'BC':
                const britishColumbia = new BritishColumbia();
                if(tripDetails.permitType === 'regular'){
                    return britishColumbia.getRegularPermitCost(tripDetails)
                }
                return britishColumbia.getOversizePermitCost(tripDetails);
            case 'MB':
                const manitoba = new Manitoba();
                if(tripDetails.permitType === 'regular'){
                    return manitoba.getRegularPermitCost(tripDetails)
                }
                return manitoba.getOversizePermitCost(tripDetails);
            case 'NB':
                const newBrunswick = new NewBrunswick();
                if(tripDetails.permitType === 'regular'){
                    return newBrunswick.getRegularPermitCost(tripDetails)
                }
                return newBrunswick.getOversizePermitCost(tripDetails);
            case 'NL':
                const newFoundland = new NewfoundlandAndLabrador();
                if(tripDetails.permitType === 'regular'){
                    return newFoundland.getRegularPermitCost(tripDetails)
                }
                return newFoundland.getOversizePermitCost(tripDetails);
            case 'NT':
                const northWesTerritories = new NorthwestTerritories();
                if(tripDetails.permitType === 'regular'){
                    return northWesTerritories.getRegularPermitCost(tripDetails)
                }
                return northWesTerritories.getOversizePermitCost(tripDetails);
            case 'NS':
                const novaScotia = new NovaScotia();
                if(tripDetails.permitType === 'regular'){
                    return novaScotia.getRegularPermitCost(tripDetails)
                }
                return novaScotia.getOversizePermitCost(tripDetails);
            case 'NU':
                const nunavut = new Nunavut();
                if(tripDetails.permitType === 'regular'){
                    return nunavut.getRegularPermitCost(tripDetails)
                }
                return nunavut.getOversizePermitCost(tripDetails);
            case 'ON':
                const ontario = new Ontario();
                if(tripDetails.permitType === 'regular'){
                    return ontario.getRegularPermitCost(tripDetails)
                }
                return ontario.getOversizePermitCost(tripDetails);
            case 'PE':
                const princeEdwardIsland = new PrinceEdwardIsland();
                if(tripDetails.permitType === 'regular'){
                    return princeEdwardIsland.getRegularPermitCost(tripDetails)
                }
                return princeEdwardIsland.getOversizePermitCost(tripDetails);
            case 'QC':
                const quebec = new Quebec();
                if(tripDetails.permitType === 'regular'){
                    return quebec.getRegularPermitCost(tripDetails);
                }
                return quebec.getOversizePermitCost(tripDetails);
            case 'SK':
                const saskatchewan = new Saskatchewan();
                if(tripDetails.permitType === 'regular'){
                    return saskatchewan.getRegularPermitCost(tripDetails)
                }
                return saskatchewan.getOversizePermitCost(tripDetails);
            case 'YT':
                const yukonTerritory = new YukonTerritory();
                if(tripDetails.permitType === 'regular'){
                    return yukonTerritory.getRegularPermitCost(tripDetails)
                }
                return yukonTerritory.getOversizePermitCost(tripDetails);
            default:
                return console.log('Please select a province');
        }

    }

}

export default Cost;