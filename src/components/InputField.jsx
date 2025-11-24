import React from "react";


export default function InputField({ label, ...props }) {
return (
<div className="space-y-1">
<p className="text-sm text-gray-600">{label}</p>
<input {...props} className="w-full p-3 border rounded-lg" />
</div>
);
}


// components/FileUploadBox.jsx
import React from "react";


export default function FileUploadBox({ onChange }) {
return (
<div className="border-2 border-dashed p-6 rounded-xl text-center">
<input type="file" onChange={onChange} className="w-full" />
<p className="text-gray-500 mt-2">Upload a File</p>
</div>
);
}