import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

const FAQSection = ({ businessData, faqsList }) => {
  console.log(JSON.stringify(faqsList, null, 2));
  const faqs = faqsList?.data?.faqs || [];
  return (
    <Box sx={{ margin: "0 auto", padding: "20px" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 3,
          pb: 1,
          borderBottom: "2px solid #00bcd4",
          fontWeight: 600,
        }}
      >
        FAQs for {businessData?.authDetails?.company}
      </Typography>

      {faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <Accordion
            key={faq._id || index} // Unique key
            sx={{
              "&:before": { display: "none" },
              boxShadow: "none",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                "& .MuiAccordionSummary-content": { margin: "16px 0" },
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No FAQs available</Typography>
      )}
    </Box>
  );
};

export default FAQSection;
