import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  useBoolean,
  PlacementWithLogical,
} from "@chakra-ui/react";
import React, { useState } from "react";

const defaultColors = [
  "gray.500",
  "red.500",
  "orange.500",
  "yellow.500",
  "green.500",
  "teal.500",
  "blue.500",
  "cyan.500",
  "purple.500",
  "pink.500",
];

export const ColorPicker = ({
  onChange,
  colors,
  bg,
  placement,
  isDisabled,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useBoolean();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const colorPalette = colors || defaultColors;

  return (
    <Popover
      isOpen={isOpen && !isDisabled}
      onClose={setIsOpen.toggle}
      placement={placement}
    >
      <PopoverTrigger>
        <Button
          bg={selectedColor || "white"}
          onClick={setIsOpen.toggle}
          _hover={{ bg: selectedColor, transform: "scale(1.05)" }}
          _active={{ bg: selectedColor }}
          aria-label="color picker"
          isDisabled={isDisabled}
        ></Button>
      </PopoverTrigger>
      <PopoverContent w="auto" bg={bg} boxShadow="md">
        <PopoverArrow />
        <SimpleGrid columns={5} p={1} spacing={1}>
          {colorPalette.map((color, index) => (
            <Button
              key={`color-picker-${color}-${index}`}
              h="40px"
              w="40px"
              p={0}
              minW="40px"
              bg={color}
              _hover={{ bg: color, transform: "scale(1.05)" }}
              _active={{ bg: color }}
              onClick={() => {
                setIsOpen.toggle();
                setSelectedColor(color);
                onChange(color);
              }}
            />
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
  );
};

interface ColorPickerProps {
  onChange: (value: string) => void;
  colors?: string[];
  bg?: string;
  placement?: PlacementWithLogical;
  isDisabled?: boolean;
}
