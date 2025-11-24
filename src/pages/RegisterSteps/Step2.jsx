
export default function Step2({ next, back, updateForm, data }) {
  return (
    <div className="space-y-4">
      <input
        name="province"
        placeholder="จังหวัด"
        defaultValue={data.province}
        onChange={(e) => updateForm({ province: e.target.value })}
        className="w-full p-3 border rounded-lg"
      />

      <input
        name="district"
        placeholder="อำเภอ"
        defaultValue={data.district}
        onChange={(e) => updateForm({ district: e.target.value })}
        className="w-full p-3 border rounded-lg"
      />

      <textarea
        name="addressDetail"
        placeholder="รายละเอียดที่อยู่เพิ่มเติม"
        defaultValue={data.addressDetail}
        onChange={(e) => updateForm({ addressDetail: e.target.value })}
        className="w-full p-3 border rounded-lg"
      />

      <div className="flex justify-between mt-6">
        <button onClick={back} className="px-6 py-2 rounded-lg bg-gray-300 cursor-pointer">
          Back
        </button>
        <button
          onClick={next}
          className="px-6 py-2 rounded-lg bg-blue-500 text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
