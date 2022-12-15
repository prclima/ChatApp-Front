import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import {Button} from "@chakra-ui/react";



const UserListItem = ({ item, HandleFunction}) => {





    return (
      <Box
       onClick={HandleFunction}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#FF8261", 
          color: "black",
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
     
         
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={item.name}
          
        />
        <Box>
            
          <Text>{item.name}</Text>
          <Text fontSize="xs">
            <b>Email:</b>
            {item.email}
          </Text>
        </Box>
      </Box>
    );
  };

  export default UserListItem;