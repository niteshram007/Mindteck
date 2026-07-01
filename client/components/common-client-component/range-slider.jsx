import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function DualThumbSlider({
  minValue,
  maxValue,
  onChange,
  label,
  values,
  step=1,
}) {
  let min = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(values[0]);

  let max = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(values[1]);

  

  return (
    <div className="w-full space-y-2">
      <Label>{label}:</Label>
      <div className="flex items-center gap-4">
        <Slider
          className="flex-1"
          min={minValue}
          max={maxValue}
          step={step}
          value={values}
          onValueChange={onChange}
          aria-label="Dual range slider"
        />
      </div>
      <p className="text-sm text-center">{`${min} - ${max}`}</p>
    </div>
  );
}
