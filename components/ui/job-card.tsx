import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Briefcase, Clock, Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jobType } from '@/lib/utils';



export default function JobCard({ job }: { job: jobType }) {
    return <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building className="h-4 w-4" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant={job.remote ? "default" : "outline"}>
                        {job.remote ? "Remote" : job.hybrid ? "Hybrid" : "On-site"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map(skill => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                         
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <div>View Job</div>
                    </Button>
                  </CardFooter>
                </Card>
}