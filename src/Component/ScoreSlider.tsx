import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function ScoreSlider({ value, onChange }: Props) {
  return (
    <Box mt={6}>
      <Text mb={2}>Min Score: {value.toFixed(2)}</Text>

      <Slider value={value} min={0} max={1} step={0.05} onChange={onChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
