class Ontario{

    UNLADEN_TRUCK_IRP_PRICE         = 23;
    LADEN_TRUCK_IRP_PRICE           = 114;
    LADEN_TRUCK_TRAILER_IRP_PRICE   = 201;
    REGULAR_PERMIT_LENGTH           = '10 DAYS';
    SHORT_TRIP_PERMIT_LENGTH        = '3 DAYS'
    OVERSIZE_PERMIT_LENGTH          = '10 DAYS';
    IFTA_MINIMUM_FEE                = 5;
    IFTA_RATE_PER_KM                = 0.089;

    getRegularPermitCost = (tripDetails) => {

        let {regIfta, regIrp, amountKms, truckType, tripInfo} = tripDetails;

        let irpPrice = 0;
        let iftaPrice = amountKms * this.IFTA_RATE_PER_KM;
        if(tripInfo){
            iftaPrice = tripInfo.toLowerCase() === 'roundtrip'? Number(parseFloat(iftaPrice).toFixed(2)):Number(parseFloat(iftaPrice).toFixed(2));

            amountKms = tripInfo.toLowerCase() === 'roundtrip'? (amountKms * 2): amountKms;
        }

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
            let totalPrice = Number(parseFloat(irpPrice + iftaPrice).toFixed(2));

            return {
                    results:true, action:'results', tripDetails:tripDetails,
                body:{
                    irpPrice:irpPrice,
                    iftaPrice:iftaPrice,
                    totalPrice:totalPrice,
                    iftaRate:this.IFTA_RATE_PER_KM,
                    unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration:this.REGULAR_PERMIT_LENGTH,
                    tripInfo:tripInfo,
                    amountKms: amountKms
                }
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
                    irpPrice:irpPrice,
                    iftaPrice:0,
                    totalPrice:totalPrice,
                    iftaRate:this.IFTA_RATE_PER_KM,
                    unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration:this.REGULAR_PERMIT_LENGTH,
                    tripInfo:tripInfo,
                    amountKms: amountKms
                }
            };

        }else if (regIfta === 'no' && regIrp === 'yes'){

            if(iftaPrice < this.IFTA_MINIMUM_FEE){
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            let totalPrice = iftaPrice;

            return {
                results:true, action:'results', tripDetails:tripDetails,
                body:{
                    irpPrice:0,
                    iftaPrice:iftaPrice,
                    totalPrice:totalPrice,
                    iftaRate:this.IFTA_RATE_PER_KM,
                    unladenTruck:this.UNLADEN_TRUCK_IRP_PRICE,
                    ladenTruck:this.LADEN_TRUCK_IRP_PRICE,
                    permitDuration:this.SHORT_TRIP_PERMIT_LENGTH,
                    tripInfo:tripInfo,
                    amountKms: amountKms
                }
            };

        }else{
            return {
                body:{

                    message:'Temporary permit may not be required. However based on your vehicle type (i.e: a bus), a temporary 10 days permit can be required to travel in Ontario. Please contact Permitszon Canada to learn more',
                },
                results: false,
                action: 'noResults'
            }
        }

    };

    getOversizePermitCost = () => {
        return{results: false, action:'noResults',
            body: { message:' We are currently unable to provide you with an estimate, based on your search parameters. Please contact one of our permit agent to get an estimate ' +
                    'for your load'}
        }
    }

}

export default Ontario;