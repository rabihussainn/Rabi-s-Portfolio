import { ICONS } from '../data/icons';

/** Brand/tool icon from data/icons.js. Size and fill come from the surrounding CSS. */
export default function Icon({ name, ...props }) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d={ICONS[name]} />
    </svg>
  );
}
