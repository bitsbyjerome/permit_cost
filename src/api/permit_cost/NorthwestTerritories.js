class NorthwestTerritories {
    UNLADEN_TRUCK_IRP_PRICE = 75;
    //UNLADEN_TRUCK_TRAILER_IRP_PRICE = 24;
    LADEN_TRUCK_IRP_PRICE = 75;
    LADEN_TRUCK_TRAILER_IRP_PRICE = 75;
    REGULAR_PERMIT_LENGTH = '5 DAYS';
    //OVERSIZE_PERMIT_LENGTH  = '10 DAYS';
    IFTA_FLAT_FEE = 59;
    IFTA_RATE_PER_KM = 0.085;




    getRegularPermitCost = (tripDetails) =>{

        return{results: false, action:'noResults',
            body: { message:' All permits must be purchased before entering the NWT. Contact any weigh scale for information and to purchase these permits. Commercial drivers should have a permit number available at road side when inspected for compliance. Payments can be made online or through a third-party permitting agent.'}
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

//https://www.inf.gov.nt.ca/fr/node/1309
//https://www.inf.gov.nt.ca/en/services/drivers-and-vehicle-services/highway-weigh-scales

export default NorthwestTerritories;