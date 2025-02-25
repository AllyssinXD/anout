export default function DatePicker(props: {
  selected: Date;
  onChange: (date: Date) => void;
}) {
  return (
    <div>
      <input
        type="date"
        value={props.selected.toISOString().split("T")[0]}
        onChange={(e) => props.onChange(new Date(e.target.value))}
      />
    </div>
  );
}
