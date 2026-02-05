//import requried modules
import { test, expect } from '@playwright/test';

// create a utility funtion to sleep for x milliseconds
export function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}