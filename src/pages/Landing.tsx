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
    <div className="min-h-screen relative">
      {/* Background Image */}
      <img src="/BACKGROUND.png" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" style={{ minHeight: '100vh' }} />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />

      {/* Main Content */}
  <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-2 sm:mb-0">
                  <img src="/LOGO-clear.png" alt="LIKAS Logo" className="w-10 h-10 object-contain rounded" />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">LIKAS</h1>
                  <p className="text-neutral-700 text-xs sm:text-sm text-center sm:text-left max-w-xs sm:max-w-none">Land Intelligence and Knowledge for Adaptive Sustainability</p>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                AI-Powered
                <span className="block font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text leading-tight pb-1">
                  Geospatial Intelligence
                </span>
              </h2>
              
              <p className="text-xl text-neutral-800 max-w-lg mx-auto text-center lg:mx-0 lg:text-left">
                Transform land analysis with cutting-edge AI technology. 
                Make informed decisions for sustainable urban development.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white/60 shadow rounded-lg border border-white/20 backdrop-blur-md">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-lg">🗺️</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-neutral-900 mb-0.5">Interactive Maps</p>
                  <p className="text-sm text-gray-500">Real-time geospatial data</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 shadow rounded-lg border border-white/20 backdrop-blur-md">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">🤖</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-neutral-900 mb-0.5">AI Analysis</p>
                  <p className="text-sm text-gray-500">Smart land assessment</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 shadow rounded-lg border border-white/20 backdrop-blur-md">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-500 text-lg">📊</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-neutral-900 mb-0.5">Data Insights</p>
                  <p className="text-sm text-gray-500">Comprehensive reports</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 shadow rounded-lg border border-white/20 backdrop-blur-md">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-500 text-lg">🌱</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-neutral-900 mb-0.5">Sustainability</p>
                  <p className="text-sm text-gray-500">Eco-friendly planning</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center text-center mt-1">
              <div className="min-w-[90px]">
                <p className="text-xl font-extrabold text-neutral-900 mb-0.5">500+</p>
                <p className="text-xs text-gray-500">Land Assessments</p>
              </div>
              <div className="min-w-[90px]">
                <p className="text-xl font-extrabold text-neutral-900 mb-0.5">98%</p>
                <p className="text-xs text-gray-500">Accuracy Rate</p>
              </div>
              <div className="min-w-[90px]">
                <p className="text-xl font-extrabold text-neutral-900 mb-0.5">24/7</p>
                <p className="text-xs text-gray-500">AI Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-neutral-900">Welcome Back</CardTitle>
                <CardDescription className="text-neutral-700">
                  Sign in to access your LIKAS dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/30 border border-gray-200 text-neutral-900 placeholder:text-neutral-500 focus:border-blue-400 focus:ring-blue-400/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/30 border border-gray-200 text-neutral-900 placeholder:text-neutral-500 focus:border-blue-400 focus:ring-blue-400/20"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In to LIKAS'
                    )}
                  </Button>
                </form>
                
                <div className="text-center">
                  <p className="text-sm text-neutral-700">
                    Demo credentials: <span className="text-blue-400">admin@likas.com</span> / <span className="text-blue-400">password</span>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2 text-sm text-neutral-700">
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
        <p className="text-sm text-neutral-700">
          © 2024 LIKAS. Powered by AI & Geospatial Intelligence.
        </p>
      </div>
    </div>
  );
};

export default Landing;
