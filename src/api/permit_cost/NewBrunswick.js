class NewBrunswick {

    UNLADEN_TRUCK_IRP_PRICE = 24;
    UNLADEN_TRUCK_TRAILER_IRP_PRICE = 24;
    LADEN_TRUCK_IRP_PRICE = 85;
    LADEN_TRUCK_TRAILER_IRP_PRICE = 169;
    //REGULAR_PERMIT_LENGTH = '10 DAYS';
    //OVERSIZE_PERMIT_LENGTH  = '10 DAYS';
    IFTA_MINIMUM_FEE = 25;
    IFTA_RATE_PER_KM = 0.13;

    getRegularPermitCost = (tripDetails) => {
        console.log(tripDetails);

        const {regIfta, regIrp, amountKms, truckType} = tripDetails;

        let irpPrice = 0;
        let iftaPrice = amountKms * this.IFTA_RATE_PER_KM + this.IFTA_MINIMUM_FEE;

        if(regIfta === 'no' && regIrp === 'no'){

            if(iftaPrice < this.IFTA_MINIMUM_FEE){
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            switch (truckType.toLowerCase()) {
                case 'unladentruck':
                    irpPrice = this.UNLADEN_TRUCK_IRP_PRICE;
                    break;
                case 'ladentruck':
                    irpPrice = this.LADEN_TRUCK_IRP_PRICE;
                    break;
                case 'ladentrucktrailer':
                    irpPrice = this.LADEN_TRUCK_TRAILER_IRP_PRICE;
                    break;
                default:
                    return void(0);
            }
            let totalPrice = irpPrice + iftaPrice;

            return {
                irpPrice:irpPrice,
                iftaPrice:iftaPrice,
                totalPrice:totalPrice,
                iftaRate:this.IFTA_RATE_PER_KM,
                unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                permitDuration:this.REGULAR_PERMIT_LENGTH,
            };


        }else if(regIfta === 'yes' && regIrp === 'no'){

            switch (truckType.toLowerCase()) {
                case 'unladentruck':
                    irpPrice = this.UNLADEN_TRUCK_IRP_PRICE;
                    break;
                case 'ladentruck':
                    irpPrice = this.LADEN_TRUCK_IRP_PRICE;
                    break;
                case 'ladentrucktrailer':
                    irpPrice = this.LADEN_TRUCK_TRAILER_IRP_PRICE;
                    break;
                default:
                    break;
            }
            let totalPrice = irpPrice;

            return {
                irpPrice:irpPrice,
                iftaPrice:0,
                totalPrice:totalPrice,
                iftaRate:this.IFTA_RATE_PER_KM,
                unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                permitDuration:this.REGULAR_PERMIT_LENGTH,
            };

        }else if (regIfta === 'no' && regIrp === 'yes'){

            if(iftaPrice < this.IFTA_MINIMUM_FEE){
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            let totalPrice = iftaPrice;

            return {
                irpPrice:0,
                iftaPrice:iftaPrice,
                totalPrice:totalPrice,
                iftaRate:this.IFTA_RATE_PER_KM,
                unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                permitDuration:this.REGULAR_PERMIT_LENGTH,
            };

        }else{
            return {message:'Temporary permit is not required'}
        }

    };

    getOversizePermitCost = () => {

    }

}
export default NewBrunswick;