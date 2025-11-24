export default function Step1({ next, updateForm, data }) {
  return (
    <div className="space-y-4">
      <input
        placeholder="ชื่อ"
        defaultValue={data.firstName}
        onChange={(e) => updateForm({ firstName: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />
      <input
        placeholder="นามสกุล"
        defaultValue={data.lastName}
        onChange={(e) => updateForm({ lastName: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />
      <input
        placeholder="เลขบัตรประชาชน"
        defaultValue={data.citizenId}
        onChange={(e) => updateForm({ citizenId: e.target.value })}
        className="w-full p-3 border rounded-lg cursor-text"
      />
      <input
        placeholder="เบอร์มือถือ"
        defaultValue={data.phone}
        onChange={(e) => updateForm({ phone: e.target.value })}
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
