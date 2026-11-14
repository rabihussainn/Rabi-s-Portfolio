import { FEATURED } from '../data/work';
import { cx } from '../lib';
import Icon from './Icon';
import KollegioPrototype from './KollegioPrototype';
import PartnerFlowDiagram from './PartnerFlowDiagram';
import { ProjectList, ProjectPeek, useProjectIndex } from './ProjectIndex';
import { Pill, Reveal, StackList } from './ui';

const VISUALS = { kollegio: KollegioPrototype, flow: PartnerFlowDiagram };

function RoleTitle({ role }) {
  if (!role.brand) return <h3>{role.title}</h3>;
  const { href, logo, logoAlt, name } = role.brand;
  return (
    <h3>
      <a className="brandLink" href={href} target="_blank" rel="noopener">
        <img className="brandMark" src={logo} width="128" height="128" alt={logoAlt} />{name}
      </a>
    </h3>
  );
}

function FeaturedRole({ role }) {
  const Visual = VISUALS[role.visual.kind];
  const accent = role.accent ? { '--k': role.accent } : undefined;
  return (
    <article className={cx('feat', role.flip && 'flip')}>
      <Reveal className="featInfo">
        <div className="meta">{role.tags.map((t) => <Pill key={t.label} tone={t.tone}>{t.label}</Pill>)}</div>
        <RoleTitle role={role} />
        <p>{role.summary}</p>
        <dl className="facts">
          {role.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}
        </dl>
        <div className="proof">
          {role.proof.map(([n, text]) => <div key={text}><b>{n}</b><span>{text}</span></div>)}
        </div>
        {role.live && (
          <div className="live"><span>See it live</span>
            {role.live.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.icon && <Icon name={l.icon} />}{l.label}</a>
            ))}
          </div>
        )}
        <div className="cols">
          {role.columns.map((col) => (
            <div key={col.title} style={accent}>
              <h4>{col.title}</h4>
              <ul>{col.items.map(([b, rest]) => <li key={b}><b>{b}</b>{rest}</li>)}</ul>
            </div>
          ))}
        </div>
        <StackList items={role.stack} />
      </Reveal>

      <Reveal className={cx('diag', role.visual.tone)} delay="1">
        <div className="cap"><span>{role.visual.caption}</span><span className="pill">{role.visual.badge}</span></div>
        <Visual />
        {role.visual.note && <p className="note">{role.visual.note}</p>}
      </Reveal>
    </article>
  );
}

export default function Work() {
  const projectIndex = useProjectIndex();
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sHead">
          <Reveal as="h2">Selected work.</Reveal>
          <Reveal as="p" className="lede" delay="1">Two roles where I’ve worked across the whole stack, from the screens people use to the APIs, integrations and cloud setup behind them.</Reveal>
        </div>
        {FEATURED.map((role) => <FeaturedRole key={role.id} role={role} />)}
        <ProjectList index={projectIndex} />
      </div>
      <ProjectPeek index={projectIndex} />
    </section>
  );
}
