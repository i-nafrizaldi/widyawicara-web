import { SelectContent, SelectItem } from "@/components/ui/select";

const GenderItem = () => {
  return (
    <SelectContent>
      <SelectItem value="MALE">Male</SelectItem>
      <SelectItem value="FEMALE">Female</SelectItem>
    </SelectContent>
  );
};

export default GenderItem;
