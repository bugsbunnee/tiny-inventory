import React, { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface Props {
   onChangeText: (text: string | undefined) => void;
}

const SearchBar: React.FC<Props> = ({ onChangeText }) => {
   const ref = useRef<HTMLInputElement>(null);

   const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (ref.current) {
         const value = ref.current.value.trim();
         onChangeText(value.length > 0 ? value : undefined);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

         <Input ref={ref} placeholder="Search products..." className="pl-10 py-5 bg-muted/60 border-slate-200" />
      </form>
   );
};

export default SearchBar;
