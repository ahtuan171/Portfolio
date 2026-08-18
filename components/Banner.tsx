export default function Banner() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 md:px-10 md:pt-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/banner.svg" alt="Ah Tuấn — Phạm Anh Tuấn" className="w-full" />
      <div className="mt-8 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=3000&pause=1000&color=FF1F35&center=true&vCenter=true&width=700&lines=Computer+Science+Student;Aspiring+Data+Analyst;Building+Web+Apps+%26+Automation+Workflows;Exploring+AI+Automation"
          alt="Computer Science Student · Aspiring Data Analyst · Building Web Apps & Automation Workflows · Exploring AI Automation"
          className="max-w-full"
        />
      </div>
    </div>
  );
}
