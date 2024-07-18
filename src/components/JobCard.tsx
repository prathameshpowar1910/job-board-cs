import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  date: string;
  company: string;
  role: string;
  experienceLevel: string;
  applicationLink: string;
}

export function JobCard({ date, company, role, experienceLevel, applicationLink }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role} at {company}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Date: {date}</p>
        <p className="text-sm text-muted-foreground">Experience Level: {experienceLevel}</p>
        <Button asChild className="mt-4">
          <a href={applicationLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
        </Button>
      </CardContent>
    </Card>
  )
}