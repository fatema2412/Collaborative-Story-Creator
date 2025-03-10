import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Box, Text, Button, useDisclosure, IconButton, Stack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from '@/redux/action/authaction';
import { FaHamburger, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LogOut());
    navigate('/');
  };

  return (
    <Flex
      as="nav"
      align="center"
      p={{ base: 4, md: 5 }}
      color="teal.600"
      width="100%"
      bg="gray.100"
      boxShadow="xl"
      position="sticky"
      top="3"
      zIndex="sticky"
      justify="flex-start"
    >
      {/* Title */}
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="semibold"
        // fontFamily="mono"
        // letterSpacing="wide"
        color="teal.600"
        pr={{base:6 ,md:8}}
      >
        Collaborative Story Creator
      </Text>

      {/* Navigation Links */}
      <Flex
        ml={{ base: 4, md: 0 }}
        position={{ md: 'absolute' }}
        left={{ md: '50%' }}
        transform={{ md: 'translateX(-50%)' }}
        align="center"
        gap={"40px"}
      >
        <Link to="/">
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color="teal.600"
            fontWeight="bold"
            _hover={{ textDecoration: 'none', color: 'teal.800' }}
          >
            Home
          </Text>
        </Link>
        <Link to="/Books">
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color="teal.600"
            fontWeight="bold"
            _hover={{ textDecoration: 'none', color: 'teal.800' }}
          >
            OnGoingStories
          </Text>
        </Link>
        <Link to="/completeStory">
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color="teal.600"
            fontWeight="bold"
            _hover={{ textDecoration: 'none', color: 'teal.800' }}
          >
            CompletedStories
          </Text>
        </Link>
      </Flex>

      {/* Mobile Menu Button */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        icon={isOpen ? <FaTimes /> : <FaHamburger />}
        variant="ghost"
        onClick={onToggle}
        aria-label="Toggle Navigation"
        ml={2}
      />

      {/* User Section */}
      <Flex ml="auto" align="center" gap={{ base: 2, md: 3 }}>
        {user ? (
          <>
            <Text
              fontSize={{ base: 'md', md: 'xl' }}
              fontStyle="italic"
              display={{ base: 'none', md: 'block' }} // Hide welcome text on small screens to save space
            >
              Welcome, {user.fullName}
            </Text>
            <Button
              colorPalette="teal" 
              size={{ base: 'sm', md: 'md' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
              colorPalette="teal" 
                size={{ base: 'sm', md: 'md' }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Text
                fontSize={{ base: 'md', md: 'xl' }}
                _hover={{ textDecoration: 'none', color: 'teal.800' }}
              >
                Register
              </Text>
            </Link>
          </>
        )}
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="100%"
          bg="gray.100"
          p={4}
          boxShadow="md"
          display={{ base: 'block', md: 'none' }}
        >
          <Stack spacing={4}>
            <Link to="/" onClick={onToggle}>
              <Text fontSize="xl" color="teal.600">
                Home
              </Text>
            </Link>
            {user ? (
              <>
                <Text fontSize="lg">Welcome, {user.fullName}</Text>
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={() => {
                    handleLogout();
                    onToggle();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={onToggle}>
                  <Button colorScheme="teal" size="md">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={onToggle}>
                  <Text fontSize="lg" color="teal.600">
                    Register
                  </Text>
                </Link>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Flex>
  );
}