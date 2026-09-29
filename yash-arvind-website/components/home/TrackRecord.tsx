import { Link } from 'next-view-transitions';
import { RuleDraw } from './RuleDraw';
import { trackRecord, type LogEntry } from './log';

function Row({ entry }: { entry: LogEntry }) {
  const body = (
    <>
      <span className="meta col-span-2 md:col-span-3">{entry.kind}</span>
      <span className="num col-span-2 text-right text-xs text-muted md:col-span-2 md:col-start-11 md:row-start-1 md:text-sm">
        {entry.date}
      </span>
      <span className="col-span-4 text-base font-medium leading-snug md:col-span-4 md:col-start-4 md:row-start-1 md:text-lg">
        {entry.result && <span className="text-accent">{entry.result}, </span>}
        {entry.title}
        {entry.href && (
          <span
            aria-hidden="true"
            className="ml-2 inline-block text-muted transition-[transform,color] duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
          >
            {entry.external ? '↗' : '→'}
          </span>
        )}
      </span>
      <span className="col-span-4 text-sm leading-snug text-muted md:col-span-3 md:col-start-8 md:row-start-1 md:text-base">
        {entry.detail}
      </span>
    </>
  );

  const rowClass = 'grid-page items-baseline gap-y-1 py-4 md:py-5';

  return (
    <li className="relative">
      <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-rule" />
      {entry.href ? (
        entry.external ? (
          <a href={entry.href} target="_blank" rel="noopener noreferrer" className={`group ${rowClass} hover:text-accent`}>
            {body}
          </a>
        ) : (
          <Link href={entry.href} className={`group ${rowClass} hover:text-accent`}>
            {body}
          </Link>
        )
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </li>
  );
}

/** One dense dated log: roles, ventures, awards. Hairlines draw in on scroll. */
export function TrackRecord() {
  const entries = trackRecord();
  return (
    <RuleDraw className="mt-14 md:mt-20">
      <ol className="border-b border-rule">
        {entries.map((entry) => (
          <Row key={`${entry.kind}-${entry.title}-${entry.date}`} entry={entry} />
        ))}
      </ol>
    </RuleDraw>
  );
}
