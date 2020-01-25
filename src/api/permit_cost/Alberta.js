class Alberta {

    REGULAR_PERMIT_LENGTH = "7 DAYS";
    IFTA_MINIMUM_FEE = 15;

    DIMENSION_FEE = 15;
    OVERWEIGHT_FEE = 0;
    MUNICIPAL_FEES = 21;
    CURRENT_TIME = 0;



    getRegularPermitCost = (tripDetails) =>{

        const {regIfta, regIrp, amountKms, truckType} = tripDetails;

        let totalPrice = this.IFTA_MINIMUM_FEE;

        return { results:true, action:'results', tripDetails:tripDetails,
            body: {
                irpPrice: 0,
                iftaPrice: this.IFTA_MINIMUM_FEE,
                totalPrice: totalPrice,
                //iftaRate: this.IFTA_RATE_PER_KM,
                permitDuration: this.REGULAR_PERMIT_LENGTH,
                iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                amountKms: parseFloat(amountKms)
            },
            information:'Additional fees may apply if you are travelling through city',
            links:''

        };

    };

    getOversizePermitCost = (tripDetails) =>{
        return{results: false, action:'noResults',
            body: { message:' We are currently unable to provide you with an estimate, based on your search parameters. Please contact one of our permit agent to get an estimate ' +
                    'for your load'}
        }
    }
}

//{results:true, body:{message:''}}
//http://www.qp.alberta.ca/documents/Regs/2002_315.pdf
//https://wideloadshipping.com/alberta-shipping-regulations/#.XirpARrQhQI

export default Alberta;