
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";

export default  function createform(){
    return (
        <form className=" gap-6 flex flex-col justify-between h-full w-full  ">
               <div className="grid gap-6 ">
               <div className="grid gap-3 pl-4 pr-6 ">
                    <Label className="">Project Name</Label>
                    <Input className="border-accent border-b-2" placeholder="Enter your project name" type="text"></Input>
                </div>
                <div className="grid gap-3 pl-4 pr-4">
                    <Label>Domain Name</Label>
                    <Input className="border-accent border-b-2" placeholder="Enter your Domain name" type="text"></Input>
                </div>
               </div>
                <div className="flex w-full justify-end items-center gap-3 max-w-2xl  min-w-full">
                <Button  className="border-accent border-b-2 bg-gray-200 text-primary w-[7rem]  md:max-w-[10rem] md:w-full shadow-gray-400 shadow-sm ">
                    cancel
                </Button>
                <Button className=" w-[10rem]   md:max-w-xs md:w-full shadow-sm  ">
                    Create
                </Button>
                </div>
                
            </form>
    )
}