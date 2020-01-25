class Manitoba {

    UNLADEN_TRUCK_IRP_PRICE = 23;
    LADEN_TRUCK_IRP_PRICE = 114;
    LADEN_TRUCK_TRAILER_IRP_PRICE = 210;
    REGULAR_PERMIT_LENGTH = '5 DAYS';
    OVERSIZE_PERMIT_LENGTH  = '10 DAYS';

    IFTA_MINIMUM_FEE = 18;
    IFTA_RATE_PER_KM = 0.06;
    IRP_FEE = 29.5;
    INSURANCE_FEE = 4.14;
    INSURANCE_TAX_FEE =0.38;
    ADMIN_FEE = 9.05;


    getRegularPermitCost = (tripDetails) =>{
        const {regIfta, regIrp, amountKms, truckType} = tripDetails;
        //let irpPrice = 0;
        let iftaPrice = Number(parseFloat(amountKms * this.IFTA_RATE_PER_KM).toFixed(2));
        //let irpPrice = Number( parseFloat( this.IRP_FEE + this.INSURANCE_FEE + this.INSURANCE_TAX_FEE + this.ADMIN_FEE).toFixed(2));
        let irpPrice = 0;
        if(iftaPrice < this.IFTA_MINIMUM_FEE){
            iftaPrice = this.IFTA_MINIMUM_FEE;
        }

        let totalPrice = irpPrice + iftaPrice;

        return { results:true, action:'results', tripDetails:tripDetails,
            body: {
                irpPrice: irpPrice,
                iftaPrice: iftaPrice,
                totalPrice: totalPrice,
                iftaRate: this.IFTA_RATE_PER_KM,
                permitDuration: this.REGULAR_PERMIT_LENGTH,
                iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                amountKms: parseFloat(amountKms)
            }, information:'Any Manitoba qualified vehicle being operated on a return trip  must purchase a $18 permit.'

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

export default Manitoba;