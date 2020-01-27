let Config:any={}

Config.env=process.env.REACT_APP_ENV;
Config.fakeApi=false;
if(Config.env=="dev"){
    Config.fakeApi=true;
}

export default Config;