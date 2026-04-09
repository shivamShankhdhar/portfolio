import SkillCard from '@/components/SkillCard';

export default function SkillsSection({ skills }: any) {
  if (!skills.length) return null;

  return (
    <section className="px-6 py-16 border-t bg-slate-50">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        {skills.map((s: any) => (
          <SkillCard key={s._id} skill={s} />
        ))}
      </div>
    </section>
  );
}