class PrinceEdwardIsland {

    UNLADEN_TRUCK_IRP_PRICE = 150;
    //UNLADEN_TRUCK_TRAILER_IRP_PRICE = 24;
    LADEN_TRUCK_IRP_PRICE = 150;
    LADEN_TRUCK_TRAILER_IRP_PRICE = 150;
    REGULAR_PERMIT_LENGTH = '5 DAYS';
    //OVERSIZE_PERMIT_LENGTH  = '10 DAYS';
    IFTA_MINIMUM_FEE = 25;
    //IFTA_RATE_PER_KM = 0.13;


    getRegularPermitCost = (tripDetails) =>{

        const {regIfta, regIrp, amountKms, truckType} = tripDetails;
        //let irpPrice = 0;
        let iftaPrice = 25;
        //let irpPrice = Number( parseFloat( this.IRP_FEE + this.INSURANCE_FEE + this.INSURANCE_TAX_FEE + this.ADMIN_FEE).toFixed(2));
        let irpPrice = this.LADEN_TRUCK_TRAILER_IRP_PRICE;


        let totalPrice = irpPrice + iftaPrice;

        return { results:true, action:'results', tripDetails:tripDetails,
            body: {
                irpPrice: irpPrice,
                iftaPrice: iftaPrice,
                totalPrice: totalPrice,
                iftaRate: 'n/a',
                permitDuration: this.REGULAR_PERMIT_LENGTH,
                iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                amountKms: parseFloat(amountKms)
            }, information:''

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

export default PrinceEdwardIsland;