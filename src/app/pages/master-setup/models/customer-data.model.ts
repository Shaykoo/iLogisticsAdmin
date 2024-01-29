export interface CustomerData {
    ROUTE_CODE:string;
    CUST_CODE:string;
    CUST_NAME:string;
    CUST_BRANCH_SEQ: number;
    LATITUDE: number;
    LONGITUDE: number;
    CHECKIN_TIME: string;
    CHECKOUT_TIME: string;
    SCHEDULE_AT: string;
    LOCATION: string;
    DELIVERY_SCANNING:string;
    ROUTE_START:string;
    ISDONE:string;
    AUDIO_COUNT: number,
    PHOTO_COUNT: number,
    SIGNATURE_COUNT: number,
    PAYMENT_SLIP_COUNT: number,
    CHECKOUT_REMARKS_COUNT: number,
    color?:string;
    lat?:number;
    lng?:number;
    CASH_CUSTOMER:string;
    DELIVERYSEQUENCE?:string;
    CUST_BRANCH_NAME?:string;
    DRIVERHASCHANGEDSEQUENCED?:string;
    CUST_SEQ?:string;
    DELIVERY_SEQ_DEFAULT?:string;
}