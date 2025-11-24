import React from "react";


export default function StepNavigation({ back, next, submit, isLast }) {
return (
<div className="flex justify-between mt-6">
{back && <button onClick={back} className="px-6 py-2 rounded-lg bg-gray-300">Back</button>}
{!isLast && <button onClick={next} className="px-6 py-2 rounded-lg bg-blue-500 text-white">Next</button>}
{isLast && <button onClick={submit} className="px-6 py-2 rounded-lg bg-green-500 text-white">Submit</button>}
</div>
);
}