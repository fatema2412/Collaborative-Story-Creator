import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex,Box,Text, IconButton,Stack,Button} from "@chakra-ui/react";
import { FaTimes,FaBars  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LogOut } from "@/redux/action/authaction";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LogOut());
    navigate('/');
    setIsMenuOpen(false)
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"  // Changed from flex-start for better distribution
      p={{ base: 4, md: 6 }}
      bg="teal.50"  // Softer background color
      color="teal.800"
      boxShadow="md"  // Softer shadow
      position="sticky"
      top="0"  // Changed from 3 to stick properly at top
      zIndex="1000"
      width="100%"
    >
      {/* Title */}
      <Box>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          color="teal.700"
          letterSpacing="wide"
        >
          Collaborative Story Creator
        </Text>
      </Box>

      {/* Navigation Links */}
      <Flex
        display={{ base: 'none', md: 'flex' }}  // Hide on mobile, show on desktop
        align="center"
        gap={{ base: "20px", md: "40px" }}
      >
        <Link to="/">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color="teal.700"
            _hover={{ color: 'teal.900', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
          >
            Home
          </Text>
        </Link>
        <Link to="/Books">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color="teal.700"
            _hover={{ color: 'teal.900', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
          >
            Ongoing Stories
          </Text>
        </Link>
        <Link to="/completeStory">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color="teal.700"
            _hover={{ color: 'teal.900', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
          >
            Completed Stories
          </Text>
        </Link>
      </Flex>

      {/* Mobile Menu Button */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        icon={isMenuOpen ? <FaTimes /> : <FaBars />} // Fixed icons
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Direct state toggle
        size="md"
        fontSize="120px"
      
        variant="ghost"
        colorPalette="teal"
        aria-label="Toggle Navigation"
      />

      {/* User Section */}
      <Flex align="center" gap={{ base: 2, md: 4 }}>
        {user ? (
          <>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              color="teal.800"
              display={{ base: 'none', md: 'block' }}
            >
              Welcome, {user.fullName}
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              size={{ base: 'sm', md: 'md' }}
              onClick={handleLogout}
              _hover={{ bg: 'teal.100' }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                colorPalette="teal"
                variant="outline"
                size={{ base: 'sm', md: 'md' }}
                _hover={{ bg: 'teal.100' }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                colorPalette="teal"
                size={{ base: 'sm', md: 'md' }}
                _hover={{ bg: 'teal.100' }}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </Flex>

      {/* Mobile Menu */}
      {isMenuOpen  && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="100%"
          bg="teal.50"
          zIndex={1}
          p={4}
          boxShadow="md"
          display={{ base: 'block', md: 'none' }}
        >
          <Stack spacing={4}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Text fontSize="lg" color="teal.700">Home</Text>
            </Link>
            <Link to="/Books" onClick={() => setIsMenuOpen(false)}>
              <Text fontSize="lg" color="teal.700">Ongoing Stories</Text>
            </Link>
            <Link to="/completeStory" onClick={() => setIsMenuOpen(false)}>
              <Text fontSize="lg" color="teal.700">Completed Stories</Text>
            </Link>
            {user && (
              <Text fontSize="lg" color="teal.700">
                Welcome, {user.fullName}
              </Text>
            )}
          </Stack>
        </Box>
      )}
    </Flex>
  );
}