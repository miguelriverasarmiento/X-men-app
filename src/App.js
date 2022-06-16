import { Heading, Center, Image, VStack, Input, SimpleGrid, GridItem, Button, Text, Box } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { getXmen, searchXmen } from './api/xmen';
import xmenLogo from './assets/xmenLogo.png';

function App() {

  const inputTextRef = useRef(null);
  const [ xmens, setXmens ] = useState([]);
  const [ textInput, setTextInput ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ errorState, setErrorState ] = useState({ hasError: false });
  
  useEffect(() => {
    getXmen(page).then(setXmens).catch(handleError);
  }, [page]);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message});
  }

  const writtenText = (event) => {
    event.preventDefault();
    const text = inputTextRef.current.value;
    setTextInput(text);
  }

  const textToFind = (event) => {
    if(event.key !== 'Enter') return;
    inputTextRef.current.value = "";

    searchXmen(textInput).then(setXmens).catch(handleError);
  }

  const onTurnPage = (next) => {
    if(!xmens.prev && page + next <= 0) return;
    if(!xmens.next && page + next >= 3) return;

    setPage( page + next);
  }

  return (
    <Box top='0' bottom='0'>
      <Heading boxShadow='xl' p='1' background='blackAlpha.900'>
        <Center>
          <Image src={xmenLogo} width={400}/>
        </Center>
      </Heading>
      
      <VStack background='blackAlpha.800'>
        <VStack>
          <Input 
            ref={inputTextRef}
            type="text"
            placeholder='Search X-men'
            onChange={writtenText}
            onKeyDown={textToFind}
            size='xs'
            width='auto'
          />
          {errorState.hasError && <div>{errorState.message}</div>}
        </VStack>
        <SimpleGrid columns={3} spacing={18}>
          {xmens?.results?.map((xmen) => (
            <GridItem key={xmen.id} p={5} >
              <Center><Text fontSize='xl' color='gray.200' textShadow='1px 2px gray'>{xmen.name}</Text></Center> 
              <Center>
                <Image src={xmen.img}/>
              </Center> 
              <Center><Text fontSize='md' color='gray.200' textShadow='1px 2px gray'>{xmen.alias}</Text></Center>
              <Center><Text fontSize='sm' textAlign='center' width='300px' color='gray.500'textShadow='1px 1px black'>
                {xmen.powers}
              </Text></Center>
            </GridItem>
          ))}
        </SimpleGrid>
        <Box boxShadow='dark-lg' p='1' rounded='md' bg='gray.600' textColor='black' textShadow='1px 1px gray'>
          <section>
            <Button colorScheme='brown' textColor='gray.400' textShadow='1px 1px black' onClick={() => onTurnPage(-1)}>PREV</Button>
              | {page} |
            <Button colorScheme='brown' textColor='gray.400' textShadow='1px 1px black' onClick={() => onTurnPage(1)}>NEXT</Button>
          </section>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
