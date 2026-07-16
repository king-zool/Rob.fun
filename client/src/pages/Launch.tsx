/**
 * Launch Wizard Page
 * 6-step form for creating and launching a new token
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Upload, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { useLocation } from 'wouter';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  // Step 1
  tokenName: string;
  ticker: string;
  description: string;
  category: string;
  // Step 2
  logoUrl: string;
  bannerUrl: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  // Step 3
  supply: string;
  decimals: string;
  burnPercent: string;
  walletLimit: string;
  txLimit: string;
  // Step 4
  bondingCurveType: string;
  graduationTarget: string;
  creatorFee: string;
  // Step 5 & 6
  confirmed: boolean;
}

const categories = ['Meme', 'Gaming', 'DeFi', 'NFT', 'Metaverse', 'AI', 'Social', 'Utility'];

export default function Launch() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    tokenName: '',
    ticker: '',
    description: '',
    category: 'Meme',
    logoUrl: '',
    bannerUrl: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    supply: '1000000000',
    decimals: '18',
    burnPercent: '0',
    walletLimit: '0',
    txLimit: '0',
    bondingCurveType: 'linear',
    graduationTarget: '1000000',
    creatorFee: '5',
    confirmed: false,
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDeploying(false);
    setDeploymentComplete(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.tokenName && formData.ticker && formData.category;
      case 2:
        return formData.logoUrl || formData.bannerUrl;
      case 3:
        return formData.supply && formData.decimals;
      case 4:
        return formData.bondingCurveType && formData.graduationTarget;
      case 5:
        return true;
      case 6:
        return formData.confirmed;
      default:
        return false;
    }
  };

  if (deploymentComplete) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Token Deployed!</h1>
            <p className="text-muted-foreground mb-8">
              Your token has been successfully deployed on Robinhood Chain. Share it with the community!
            </p>
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow gap-2"
                onClick={() => setLocation(`/token/new-token-id`)}
              >
                <Rocket size={20} />
                View Your Token
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setLocation('/')}
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">Launch Your Token</h1>
            <p className="text-muted-foreground">Complete the wizard to deploy your meme coin</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i + 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    i + 1 < currentStep
                      ? 'bg-success text-white'
                      : i + 1 === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1 < currentStep ? <Check size={20} /> : i + 1}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 border-border">
                {/* Step 1: Token Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Token Information</h2>
                      <p className="text-muted-foreground">Basic details about your token</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Token Name</Label>
                        <Input
                          placeholder="e.g., Doge Moon"
                          value={formData.tokenName}
                          onChange={(e) => handleInputChange('tokenName', e.target.value)}
                          className="bg-background border-border mt-2"
                        />
                      </div>
                      <div>
                        <Label>Ticker Symbol</Label>
                        <Input
                          placeholder="e.g., DOGE"
                          value={formData.ticker}
                          onChange={(e) => handleInputChange('ticker', e.target.value.toUpperCase())}
                          className="bg-background border-border mt-2"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe your token and its purpose..."
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="bg-background border-border mt-2"
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="bg-background border-border mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Branding */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Branding</h2>
                      <p className="text-muted-foreground">Logo, banner, and social links</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Logo URL</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="https://example.com/logo.png"
                            value={formData.logoUrl}
                            onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                            className="bg-background border-border flex-1"
                          />
                          <Button variant="outline" className="gap-2">
                            <Upload size={16} />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Banner URL</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="https://example.com/banner.png"
                            value={formData.bannerUrl}
                            onChange={(e) => handleInputChange('bannerUrl', e.target.value)}
                            className="bg-background border-border flex-1"
                          />
                          <Button variant="outline" className="gap-2">
                            <Upload size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Website</Label>
                          <Input
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="bg-background border-border mt-2"
                          />
                        </div>
                        <div>
                          <Label>Twitter</Label>
                          <Input
                            placeholder="https://twitter.com/..."
                            value={formData.twitter}
                            onChange={(e) => handleInputChange('twitter', e.target.value)}
                            className="bg-background border-border mt-2"
                          />
                        </div>
                        <div>
                          <Label>Telegram</Label>
                          <Input
                            placeholder="https://t.me/..."
                            value={formData.telegram}
                            onChange={(e) => handleInputChange('telegram', e.target.value)}
                            className="bg-background border-border mt-2"
                          />
                        </div>
                        <div>
                          <Label>Discord</Label>
                          <Input
                            placeholder="https://discord.gg/..."
                            value={formData.discord}
                            onChange={(e) => handleInputChange('discord', e.target.value)}
                            className="bg-background border-border mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Token Configuration */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Token Configuration</h2>
                      <p className="text-muted-foreground">Supply, decimals, and limits</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Total Supply</Label>
                          <Input
                            type="number"
                            placeholder="1000000000"
                            value={formData.supply}
                            onChange={(e) => handleInputChange('supply', e.target.value)}
                            className="bg-background border-border mt-2"
                          />
                        </div>
                        <div>
                          <Label>Decimals</Label>
                          <Input
                            type="number"
                            placeholder="18"
                            value={formData.decimals}
                            onChange={(e) => handleInputChange('decimals', e.target.value)}
                            className="bg-background border-border mt-2"
                            min="0"
                            max="18"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Burn Percentage (%)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.burnPercent}
                          onChange={(e) => handleInputChange('burnPercent', e.target.value)}
                          className="bg-background border-border mt-2"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Max Wallet Limit (%)</Label>
                          <Input
                            type="number"
                            placeholder="0 (unlimited)"
                            value={formData.walletLimit}
                            onChange={(e) => handleInputChange('walletLimit', e.target.value)}
                            className="bg-background border-border mt-2"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div>
                          <Label>Max TX Limit (%)</Label>
                          <Input
                            type="number"
                            placeholder="0 (unlimited)"
                            value={formData.txLimit}
                            onChange={(e) => handleInputChange('txLimit', e.target.value)}
                            className="bg-background border-border mt-2"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Launch Settings */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Launch Settings</h2>
                      <p className="text-muted-foreground">Bonding curve and graduation parameters</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Bonding Curve Type</Label>
                        <Select value={formData.bondingCurveType} onValueChange={(value) => handleInputChange('bondingCurveType', value)}>
                          <SelectTrigger className="bg-background border-border mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="exponential">Exponential</SelectItem>
                            <SelectItem value="sigmoid">Sigmoid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Graduation Target (Market Cap in $)</Label>
                        <Input
                          type="number"
                          placeholder="1000000"
                          value={formData.graduationTarget}
                          onChange={(e) => handleInputChange('graduationTarget', e.target.value)}
                          className="bg-background border-border mt-2"
                        />
                      </div>
                      <div>
                        <Label>Creator Fee (%)</Label>
                        <Input
                          type="number"
                          placeholder="5"
                          value={formData.creatorFee}
                          onChange={(e) => handleInputChange('creatorFee', e.target.value)}
                          className="bg-background border-border mt-2"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Review Your Token</h2>
                      <p className="text-muted-foreground">Make sure everything looks correct</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Token Name</p>
                          <p className="font-semibold">{formData.tokenName}</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Ticker</p>
                          <p className="font-semibold">{formData.ticker}</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Category</p>
                          <p className="font-semibold">{formData.category}</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Supply</p>
                          <p className="font-semibold">{parseInt(formData.supply).toLocaleString()}</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Bonding Curve</p>
                          <p className="font-semibold capitalize">{formData.bondingCurveType}</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-1">Creator Fee</p>
                          <p className="font-semibold">{formData.creatorFee}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Confirmation */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Confirm & Deploy</h2>
                      <p className="text-muted-foreground">Review and confirm your token deployment</p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <p className="text-sm mb-3">
                          By deploying this token, you agree to our Terms of Service and acknowledge that:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>✓ You have the right to create this token</li>
                          <li>✓ The token information is accurate and not misleading</li>
                          <li>✓ You understand the risks of token creation</li>
                          <li>✓ You accept the platform fees</li>
                        </ul>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.confirmed}
                          onChange={(e) => handleInputChange('confirmed', e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">I confirm all information is correct and I accept the terms</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>

                  {currentStep < 6 ? (
                    <Button
                      className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground btn-glow gap-2"
                      onClick={handleNextStep}
                      disabled={!isStepValid()}
                    >
                      Next
                      <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground btn-glow gap-2"
                      onClick={handleDeploy}
                      disabled={!isStepValid() || isDeploying}
                    >
                      {isDeploying ? (
                        <>
                          <div className="animate-spin">⏳</div>
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket size={16} />
                          Deploy Token
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
