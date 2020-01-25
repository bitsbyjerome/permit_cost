class NewBrunswick {

    UNLADEN_TRUCK_IRP_PRICE = 24;
    //UNLADEN_TRUCK_TRAILER_IRP_PRICE = 24;
    LADEN_TRUCK_IRP_PRICE = 85;
    LADEN_TRUCK_TRAILER_IRP_PRICE = 169;
    REGULAR_PERMIT_LENGTH = '7 DAYS';
    //OVERSIZE_PERMIT_LENGTH  = '10 DAYS';
    IFTA_MINIMUM_FEE = 25;
    IFTA_RATE_PER_KM = 0.13;

    getRegularPermitCost = (tripDetails) => {
        console.log(tripDetails);

        const {regIfta, regIrp, amountKms, truckType} = tripDetails;

        let irpPrice = 0;
        let iftaPrice = Number(parseFloat(amountKms * this.IFTA_RATE_PER_KM + this.IFTA_MINIMUM_FEE).toFixed(2));

        if(regIfta === 'no' && regIrp === 'no'){

            if(iftaPrice < this.IFTA_MINIMUM_FEE){
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            switch (truckType.toLowerCase()) {
                case 'unladen_truck':
                    irpPrice = this.UNLADEN_TRUCK_IRP_PRICE;
                    break;
                case 'laden_truck':
                    irpPrice = this.LADEN_TRUCK_IRP_PRICE;
                    break;
                case 'laden_truck_trailer':
                    irpPrice = this.LADEN_TRUCK_TRAILER_IRP_PRICE;
                    break;
                default:
                    return void(0);
            }
            let totalPrice = irpPrice + iftaPrice;

            return {
                results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: irpPrice,
                    iftaPrice: iftaPrice,
                    totalPrice: totalPrice,
                    iftaRate: this.IFTA_RATE_PER_KM,
                    unladenTruck: this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck: this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration: this.REGULAR_PERMIT_LENGTH,
                },information:''
            };


        }else if(regIfta === 'yes' && regIrp === 'no'){

            switch (truckType.toLowerCase()) {
                case 'unladen_truck':
                    irpPrice = this.UNLADEN_TRUCK_IRP_PRICE;
                    break;
                case 'laden_truck':
                    irpPrice = this.LADEN_TRUCK_IRP_PRICE;
                    break;
                case 'laden_truck_trailer':
                    irpPrice = this.LADEN_TRUCK_TRAILER_IRP_PRICE;
                    break;
                default:
                    break;
            }
            let totalPrice = irpPrice;

            return {
                results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: irpPrice,
                    iftaPrice: 0,
                    totalPrice: totalPrice,
                    iftaRate: this.IFTA_RATE_PER_KM,
                    unladenTruck: this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck: this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration: this.REGULAR_PERMIT_LENGTH,
                }
            };

        }else if (regIfta === 'no' && regIrp === 'yes'){

            if(iftaPrice < this.IFTA_MINIMUM_FEE){
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            let totalPrice = iftaPrice;

            return {
                results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: 0,
                    iftaPrice: iftaPrice,
                    totalPrice: totalPrice,
                    iftaRate: this.IFTA_RATE_PER_KM,
                    unladenTruck: this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck: this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration: this.REGULAR_PERMIT_LENGTH,
                }
            };

        }else{
            return {message:'Temporary permit is not required'}
        }

    };

    getOversizePermitCost = () => {
        return{results: false, action:'noResults',
            body: { message:' We are currently unable to provide you with an estimate, based on your search parameters. Please contact one of our permit agent to get an estimate ' +
                    'for your load'}
        }

    }

}
export default NewBrunswick;