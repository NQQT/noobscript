import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
import { useToggle } from '@common/assets';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type TypeDrawerStatisticAccordion = {
  name: any;
  value: any;
};
type Type = React.FC<TypeDrawerStatisticAccordion>;

export const AccordianDrawerMenu: Type = React.memo(({ name, value }) => {
  const toggle = useToggle(false);
  return (
    <Accordion expanded={toggle()} onChange={() => toggle(!toggle())}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{value}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Controls here?</Typography>
      </AccordionDetails>
    </Accordion>
  );
});
