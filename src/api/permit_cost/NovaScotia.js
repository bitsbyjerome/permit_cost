class NovaScotia {

    UNLADEN_TRUCK_IFTA_PRICE = 0.0570;
    LADEN_TRUCK_IFTA_PRICE = 0.0570;
    UNLADEN_TRUCK_TRAILER_IFTA_PRICE = 0.0855;
    LADEN_TRUCK_TRAILER_IFTA_PRICE = 0.0855;
    LADEN_BUS_IFTA_PRICE=0.0427;
    UNLADEN_BUS_IFTA_PRICE=0.0427;
    LADEN_CUBE_VAN_IFTA_PRICE=0.0427;
    UNLADEN_CUBE_VAN_IFTA_PRICE=0.0427;

    REGULAR_TRIP_PERMIT_LENGTH = '30 DAYS';
    REGULAR_FUEL_PERMIT_LENGTH= '7 DAYS'
    //OVERSIZE_PERMIT_LENGTH  = '10 DAYS';
    IFTA_MINIMUM_FEE = 11.50;
    IRP_FLAT_FEE = 160;
    //IFTA_RATE_PER_KM = 0.13;

    getRegularPermitCost = (tripDetails) =>{

        const {regIfta, regIrp, amountKms, truckType, tripInfo} = tripDetails;
        let iftaPrice = 0;
        let irpPrice = this.IRP_FLAT_FEE;
        if(regIfta === 'no' && regIrp === 'no') {

            switch (truckType.toLowerCase()) {
                case 'unladen_truck':
                    iftaPrice = Number(parseFloat(amountKms * this.UNLADEN_TRUCK_IFTA_PRICE).toFixed(2));
                    break;
                case 'laden_truck':
                    iftaPrice = Number(parseFloat(amountKms * this.LADEN_TRUCK_IFTA_PRICE).toFixed(2));
                    break;
                case 'laden_truck_trailer':
                    iftaPrice = Number(parseFloat(amountKms * this.LADEN_TRUCK_TRAILER_IFTA_PRICE).toFixed(2));
                    break;
                default:
                    return void(0);
            }

            if (iftaPrice < this.IFTA_MINIMUM_FEE) {
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            iftaPrice = tripInfo.toLowerCase() === 'roundtrip'? Number(parseFloat(iftaPrice*2).toFixed(2)):Number(parseFloat(iftaPrice).toFixed(2));


            let totalPrice = Number(parseFloat(irpPrice + iftaPrice).toFixed(2));

            return {results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: irpPrice,
                    iftaPrice: iftaPrice,
                    totalPrice: totalPrice,
                    iftaRate: 'n/a',
                    permitDuration: this.REGULAR_FUEL_PERMIT_LENGTH,
                    iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                    amountKms: parseFloat(amountKms)
                }
            };

        }if(regIfta === 'yes' && regIrp === 'no'){

            let totalPrice = Number(parseFloat(irpPrice + iftaPrice).toFixed(2));

            return {results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: irpPrice,
                    iftaPrice: iftaPrice,
                    totalPrice: totalPrice,
                    iftaRate: 'n/a',
                    permitDuration: this.REGULAR_FUEL_PERMIT_LENGTH,
                    iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                    amountKms: parseFloat(amountKms)
                }
            };

        }if(regIfta === 'no' && regIrp === 'yes'){
            irpPrice =0;
            switch (truckType.toLowerCase()) {
                case 'unladen_truck':
                    iftaPrice = Number(parseFloat(amountKms * this.UNLADEN_TRUCK_IFTA_PRICE).toFixed(2));
                    break;
                case 'laden_truck':
                    iftaPrice = Number(parseFloat(amountKms * this.LADEN_TRUCK_IFTA_PRICE).toFixed(2));
                    break;
                case 'laden_truck_trailer':
                    iftaPrice = Number(parseFloat(amountKms * this.LADEN_TRUCK_TRAILER_IFTA_PRICE).toFixed(2));
                    break;
                default:
                    return void(0);
            }

            if (iftaPrice < this.IFTA_MINIMUM_FEE) {
                iftaPrice = this.IFTA_MINIMUM_FEE;
            }

            iftaPrice = tripInfo.toLowerCase() === 'roundtrip'? Number(parseFloat(iftaPrice*2).toFixed(2)):Number(parseFloat(iftaPrice).toFixed(2));

            let totalPrice = Number(parseFloat(irpPrice + iftaPrice).toFixed(2));

            return {results:true, action:'results', tripDetails:tripDetails,
                body: {
                    irpPrice: irpPrice,
                    iftaPrice: iftaPrice,
                    totalPrice: totalPrice,
                    iftaRate: 'n/a',
                    permitDuration: this.REGULAR_FUEL_PERMIT_LENGTH,
                    iftaMinimumFee: this.IFTA_MINIMUM_FEE,
                    amountKms: parseFloat(amountKms)
                }
            };
        } if(regIfta === 'yes' && regIrp === 'yes'){
            return {
                results: false, action:'noResults',
                body: {
                    message: 'Temporary permit is not required'
                }
            }
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

//https://novascotia.ca/sns/paal/rmv/paal284.asp

export default NovaScotia;