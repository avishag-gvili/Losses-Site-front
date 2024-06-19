import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface PlaygroundProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface FilmOptionType {
  title: string;
}
export default function Playground({ handleChange }: PlaygroundProps) {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option: FilmOptionType) => option.title,
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    handleChange({
      target: {
        name: 'area',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Autocomplete
      {...defaultProps}
      id="disable-close-on-select"
      disableCloseOnSelect
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="אזור בארץ"
          variant="standard"
          name='area'
          id='area'
          fullWidth
        />
      )}
    />
  )
}

const top100Films = [
  { title: 'החוף הצפוני' },
  { title: 'הצפון' },
  { title: 'הגליל' },
  { title: 'השרון' },
  { title: 'המרכז' },
  { title: 'השפלה' },
  { title: 'הנגב' },
  { title: 'ירושלים והסביבה' },
  { title: 'הרי יהודה והשומרון' },
  { title: 'ערבה' },
];







