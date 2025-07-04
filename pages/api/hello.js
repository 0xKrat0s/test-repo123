// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: 'Muhsin Bin Irshad',
    title: 'Security Engineer',
    location: 'Kerala, India',
    linkedin: 'https://linkedin.com/in/muhsinbinirshad',
    bio: 'Dynamic security engineer with hands-on experience in vulnerability assessment, penetration testing, and red teaming. Passionate about open-source, OSINT, and continuous learning.'
  })
}
