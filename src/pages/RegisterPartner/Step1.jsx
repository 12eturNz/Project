export default function Step1({ next, updateForm, data }) {
  return (
    <div className="space-y-4">

      <input
        placeholder="ชื่อบริษัท"
        defaultValue={data.companyName}
        onChange={(e) => updateForm({ companyName: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />

      <input
        placeholder="เลขทะเบียนนิติบุคคล"
        defaultValue={data.companyId}
        onChange={(e) => updateForm({ companyId: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />

      <input
        placeholder="ชื่อผู้ติดต่อ"
        defaultValue={data.contactName}
        onChange={(e) => updateForm({ contactName: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />

      <button
        onClick={next}
        className="w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
