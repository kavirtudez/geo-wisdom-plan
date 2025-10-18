import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-green-400 rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 border-2 border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-purple-400 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <img src="/LANDsense_Logo.png" alt="LandSense Logo" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">LandSense</h1>
                  <p className="text-blue-200 text-sm">Sustainable Urban Planning</p>
                </div>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                AI-Powered
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  Geospatial Intelligence
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Transform land analysis with cutting-edge AI technology. 
                Make informed decisions for sustainable urban development.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <img src="/LANDsense_Logo.png" alt="LandSense Logo" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <p className="text-white font-medium">Interactive Maps</p>
                  <p className="text-gray-400 text-sm">Real-time geospatial data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">🤖</span>
                </div>
                <div>
                  <p className="text-white font-medium">AI Analysis</p>
                  <p className="text-gray-400 text-sm">Smart land assessment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400">📊</span>
                </div>
                <div>
                  <p className="text-white font-medium">Data Insights</p>
                  <p className="text-gray-400 text-sm">Comprehensive reports</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400">🌱</span>
                </div>
                <div>
                  <p className="text-white font-medium">Sustainability</p>
                  <p className="text-gray-400 text-sm">Eco-friendly planning</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-gray-400 text-sm">Land Assessments</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-gray-400 text-sm">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-gray-400 text-sm">AI Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">🔐</span>
                </div>
                <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-300">
                  Sign in to access your LandSense dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In to LandSense'
                    )}
                  </Button>
                </form>
                
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Demo credentials: <span className="text-blue-400">admin@landsense.com</span> / <span className="text-blue-400">password</span>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      🔒 Secure
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      🚀 Fast
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      ✨ Modern
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400">
          © 2024 LandSense. Powered by AI & Geospatial Intelligence.
        </p>
      </div>
    </div>
  );
};

export default Landing;
