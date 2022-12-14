import { ViewIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Text,
  
  } from '@chakra-ui/react'


function Perfil({user, children}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
       <>
    {
        children ? (<span onClick={onOpen}> {children} </span>) : (
            <IconButton
            d={{base: "flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )
    }
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="40px"
          display="flex"
          justifyContent="center"
          >
          {[user.data.name]}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          <Text p="4px">
             E-mail Cadstrado :{[user.data.email]}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>

       </>
    )
}

export default Perfil;