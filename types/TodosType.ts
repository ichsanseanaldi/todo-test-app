export interface Todo {
    userId:number,
    id:number,
    title:string,
    completed:boolean
    
}

export interface Todos {
    data : Todo[];
   
}

export interface ResponseList <T> {
    map(arg:any):       any ;
    status:             string;
    endpointName:       string;
    requestId:          string;
    startedTimeStamp:   number;
    data:               T;
    fulfilledTimeStamp: number;
    isUninitialized:    boolean;
    isLoading:          boolean;
    isSuccess:          boolean;
    isError:            boolean;
    currentData:        T;
    isFetching:         boolean;
}

export interface ParentResponse <T>{
    data : ResponseList<T>[];
}