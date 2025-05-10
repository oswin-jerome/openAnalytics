
import CreateFrom from  '@/components/project-form';

export default function(){
    return(
       <div className="min-h-[90vh] h-[90vh] bg-gradient-to-r from-purple-500 to-pink-500 ">
        <div className='w-full h-full p-6 flex justify-center items-center  '>
        <div className="w-full max-w-4xl h-[70%]  p-4 flex flex-col  gap-3 rounded-2xl bg-gray-200">
            <div className="p-4 w-full  text-xl text-primary  font-bold rounded-lg text-start "> New Project</div>
            <div className="w-full h-full  ">
            <CreateFrom/>
            </div>
        </div>
        </div>
       </div>
    )
}