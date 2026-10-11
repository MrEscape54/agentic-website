import { Icon, type IconName } from "./Icon";

export function IconTile({ name }: { name: IconName }) {
  return <span className="olive-icon-tile" aria-hidden="true"><Icon name={name} size={25} /></span>;
}
