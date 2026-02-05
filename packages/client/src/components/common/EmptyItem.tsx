import { ArrowUpRightIcon, Folder } from 'lucide-react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty';
import { Button } from '../ui/button';

interface Props {
   title: string;
   description: string;
   buttonLabel: string;
   onCreate: () => void;
}

const EmptyItem: React.FC<Props> = ({ buttonLabel, title, description, onCreate }) => {
   return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
         <Empty>
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <Folder />
               </EmptyMedia>

               <EmptyTitle>{title}</EmptyTitle>

               <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>

            <EmptyContent className="flex-row justify-center gap-2">
               <Button onClick={onCreate}>{buttonLabel}</Button>
            </EmptyContent>

            <Button variant="link" asChild className="text-muted-foreground" size="sm">
               <a href="#">
                  Learn More <ArrowUpRightIcon />
               </a>
            </Button>
         </Empty>
      </div>
   );
};

export default EmptyItem;
