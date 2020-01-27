import Config from '../Config';
import axios,{AxiosRequestConfig,AxiosResponse,AxiosError} from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = Config.host;

export default class HttpClient{
    public static beforeRequest?:(request:AxiosRequestConfig)=>AxiosRequestConfig;
    public static beforeResponse?:(response:AxiosResponse)=>AxiosResponse;
    public static onError?:(err:AxiosError)=>void;
    public static async get(url:string,other?:AxiosRequestConfig){
        let request:AxiosRequestConfig={
            method:'get',
            url:this.combineUrl(url),
            ...other
        };
        
        return await this.createRequest(request);
    }

    public static async post(url:string,data:any,other?:AxiosRequestConfig){
        let request:AxiosRequestConfig={
            method:'post',
            url:this.combineUrl(url),
            data:data,
            ...other
        };
        
        return await this.createRequest(request);
    }

    public static async request(url:string,method:string,other?:AxiosRequestConfig){
        let request:AxiosRequestConfig={
            method:method as any,
            url:this.combineUrl(url),
            ...other
        };
        return await this.createRequest(request);
    }

    private static async createRequest(request:AxiosRequestConfig){
        try{
            let _request:AxiosRequestConfig=this.beforeRequest?this.beforeRequest(request):request;
            let resp = await axios.request(_request);
            return this.beforeResponse?this.beforeResponse(resp):resp;
        }
        catch(error)
        {
            //当设置了onError时过滤错误类型
            if(this.onError && error.isAxiosError){
                this.onError(error);
            }
            else{
                throw error;
            }
        }
    }

    private static combineUrl(url:string):string{
        // return new URL(url,Config.host).href
        return url;
    }
}