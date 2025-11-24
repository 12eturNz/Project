export default function Step3({ back, submit, updateForm }) {
  return (
    <div className="space-y-4">

      <div className="relative border-2 border-dashed p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center">

        {/* file input */}
        <input
          type="file"
          onChange={(e) => updateForm({ file: e.target.files[0] })}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* text */}
        <div className="text-center pointer-events-none">
          <p className="font-medium">Choose File</p>
          <p className="text-gray-500">No file chosen</p>
        </div>

      </div>

      <div className="flex justify-between">
        <button onClick={back} className="px-6 py-2 bg-gray-300 rounded-lg cursor-pointer">Back</button>
        <button onClick={submit} className="px-6 py-2 bg-green-500 text-white rounded-lg cursor-pointer">Submit</button>
      </div>

    </div>
  );
}
