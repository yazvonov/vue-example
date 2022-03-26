import type Good from "@/interfaces/Good";

export default interface GroupedGoods {
  groupId: number;
  groupTitle: string;
  goods: Good[];
}
