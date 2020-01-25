class BritishColumbia {


    getRegularPermitCost = (tripDetails) =>{

        return{results: false, action:'noResults',
            body: { message:' We are currently unable to provide you with an estimate, based on your search parameters. Please contact one of our permit agent to get an estimate ' +
                    'for your load'}
        }
    };

    getOversizePermitCost = (tripDetails) =>{
        return{results: false, action:'noResults',
            body: { message:' We are currently unable to provide you with an estimate, based on your search parameters. Please contact one of our permit agent to get an estimate ' +
                    'for your load'}
        }
    }
}

//{results:true, body:{message:''}}
//https://www.cvse.ca/tps/documents/online_permits_brochure.pdf
//https://vancouver.ca/streets-transportation/oversize-truck-permits.aspx
//Permit is required eventhough truck is below 11 794 kgs
//Note:    Vehicles licensed under 11,800 kg and having more than two axles,   also require a Motive Fuel User permit. In this situation, please contact the Provincial Permit Centre at 1-800-559-9688.

export default BritishColumbia;