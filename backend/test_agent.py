import importlib
import os
import sys
import unittest
from unittest.mock import patch


class GeminiFallbackTests(unittest.TestCase):
    def test_missing_api_key_does_not_crash_import(self):
        with patch.dict(os.environ, {}, clear=True), \
             patch("dotenv.load_dotenv", return_value=False):
            sys.modules.pop("agent", None)
            agent = importlib.import_module("agent")

            result = agent.explain_log("ERROR: disk full")

            self.assertIn("Gemini API key", result)

    def test_missing_api_key_returns_local_analysis(self):
        with patch.dict(os.environ, {}, clear=True), \
             patch("dotenv.load_dotenv", return_value=False):
            sys.modules.pop("agent", None)
            agent = importlib.import_module("agent")

            result = agent.explain_log("ERROR: database timeout after 5 seconds")

            self.assertIn("Root Cause", result)
            self.assertIn("Impact", result)
            self.assertIn("Suggested Fix", result)
            self.assertIn("database timeout", result.lower())


if __name__ == "__main__":
    unittest.main()
